"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Loader2, Upload, Sparkles, ArrowLeft, AlertTriangle, Shirt, User as UserIcon, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { getProductById } from "@/actions/productActions";
import type { Product, ProductCategory, ProductSize } from "@/types";
import { ALL_CATEGORIES, ALL_SIZES } from "@/types";
import { ProductImage } from "@/components/products/ProductImage";

export function AiTryOnClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [productError, setProductError] = useState<string | null>(null);
  const [userFile, setUserFile] = useState<File | null>(null);
  const [userPreview, setUserPreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const currentUser = session?.user ?? null;
  const loadingAuth = status === "loading";

  const productId = searchParams.get("productId");

  useEffect(() => {
    if (!productId) {
      setProductError("No product was selected. Please go back and choose a product to try on.");
      return;
    }

    const fetchProduct = async () => {
      try {
        const result = await getProductById(productId);
        if ("error" in result) {
          setProductError(result.error);
          return;
        }

        const data = result;
        let parsedSizes: ProductSize[] = [];
        if (Array.isArray(data.sizes)) {
          parsedSizes = data.sizes
            .map((size) => String(size).trim().toUpperCase())
            .filter((size) => ALL_SIZES.includes(size as ProductSize)) as ProductSize[];
        } else if (typeof data.sizes === "string" && data.sizes.length > 0) {
          parsedSizes = data.sizes
            .split(",")
            .map((size) => size.trim().toUpperCase())
            .filter((size) => ALL_SIZES.includes(size as ProductSize)) as ProductSize[];
        }

        const mappedProduct: Product = {
          id: data.id,
          name: data.name || "Unnamed Product",
          description: data.description || "",
          price: typeof data.price === "number" ? data.price : 0,
          imageUrl: data.imageUrl || "https://placehold.co/600x800.png",
          category: (ALL_CATEGORIES.includes(data.category) ? data.category : ALL_CATEGORIES[0]) as ProductCategory,
          sizes: parsedSizes.length > 0 ? parsedSizes : ["One Size"],
          sellerId: data.sellerId || "unknown_seller",
          createdAt: data.createdAt,
        };

        if (mappedProduct.name === "Unnamed Product") {
          setProductError(`Product data for ID ${productId} is invalid or incomplete.`);
        } else {
          setProduct(mappedProduct);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProductError("There was an error fetching the product details from the database.");
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    return () => {
      if (userPreview) URL.revokeObjectURL(userPreview);
    };
  }, [userPreview]);

  const openFilePicker = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      setUserFile(null);
      setUserPreview(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (userPreview) {
      URL.revokeObjectURL(userPreview);
    }

    setUserFile(file);
    setUserPreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleGenerate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userFile || !product?.imageUrl) {
      setError("Missing user photo or product image.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    toast({ title: "AI Generation In Progress...", description: "Our AI is creating your virtual try-on. This might take a moment!" });

    const formData = new FormData();
    formData.set("person_file", userFile);
    formData.set("clothing_file", product.imageUrl);
    formData.set("seed", "42");

    const response = await fetch("/api/try-on", {
      method: "POST",
      body: formData,
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = typeof payload?.details === "string" && payload.details ? payload.details : "Failed to process images";
      setError(message);
      toast({ title: "Generation Failed", description: message, variant: "destructive" });
    } else if (typeof payload?.imageUrl === "string" && payload.imageUrl) {
      setGeneratedImage(payload.imageUrl);
      toast({ title: "Success!", description: "Your virtual try-on is ready." });
    } else {
      const message = "RapidAPI returned no generated image.";
      setError(message);
      toast({ title: "Generation Failed", description: message, variant: "destructive" });
    }

    setIsGenerating(false);
  };

  const UploadPlaceholder = ({ icon: Icon, title, description, onClick }: { icon: React.ElementType; title: string; description: string; onClick?: () => void }) => (
    <div
      className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors text-center p-4"
      onClick={onClick}
    >
      <Icon className="h-12 w-12 text-muted-foreground mb-2" />
      <h3 className="font-semibold text-foreground text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );

  if (loadingAuth) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Verifying access...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center text-center">
        <Card className="max-w-md w-full p-8 shadow-xl rounded-2xl border-2 border-primary/20">
          <CardHeader>
            <ShieldAlert className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl font-headline font-bold">Respected user, signup your account first.</CardTitle>
            <CardDescription className="text-lg mt-2">You need to be logged in to access the AI Virtual Try-On feature.</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-4 mt-6">
            <Button asChild size="lg" className="w-full">
              <Link href="/signup">Sign Up Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/login">Already have an account? Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="text-center mb-10">
        <Sparkles className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold mb-3">AI Virtual Try-On</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">See how our clothes look on you before you buy. Upload a clear, front-facing photo of yourself for the best results.</p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          name="person_file"
        />

        {productError ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {productError}
              <Button variant="link" onClick={() => router.back()} className="p-0 h-auto ml-2">Go Back</Button>
            </AlertDescription>
          </Alert>
        ) : !product ? (
          <div className="text-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <form onSubmit={handleGenerate}>
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Step 1: Prepare Your Images</CardTitle>
                <CardDescription>Upload your photo and confirm the product for your try-on session.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-primary" />
                    Your Photo
                  </h3>
                  {userPreview ? (
                    <div className="relative group w-full max-w-sm">
                      <img src={userPreview} alt="Your uploaded photo" className="rounded-lg border shadow-md object-cover aspect-[3/4] w-full" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <Button type="button" variant="secondary" onClick={openFilePicker}>Change Photo</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <UploadPlaceholder icon={UserIcon} title="Upload Your Picture" description="Clear, front-facing portrait" onClick={openFilePicker} />
                    </>
                  )}

                </div>

                <div className="flex flex-col items-center gap-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Shirt className="h-5 w-5 text-primary" />
                    Product Photo
                  </h3>
                  <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-lg border shadow-md bg-muted/20 flex flex-col items-center justify-center overflow-hidden">
                    <ProductImage src={product.imageUrl} alt={product.name} width={400} height={533} className="rounded-lg object-cover" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg truncate max-w-xs">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <input type="hidden" name="clothing_file" value={product.imageUrl} />
                  <input type="hidden" name="seed" value="42" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl text-center mt-8">
              <CardHeader>
                <CardTitle>Step 2: Generate Your Try-On</CardTitle>
                <CardDescription>Ready to see the result? Our AI will blend your photo with the garment.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" type="submit" disabled={isGenerating || !userFile} className="h-14 px-8 text-lg">
                  {isGenerating ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
                  {isGenerating ? "Generating..." : "Generate Try-On"}
                </Button>
                {!userFile && (
                  <p className="text-sm text-muted-foreground mt-4 font-medium flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4" /> Please upload your photo to enable generation.
                  </p>
                )}
              </CardContent>
            </Card>
          </form>
        )}

        {error && (
          <Alert variant="destructive" className="mt-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {generatedImage && (
          <Card className="mt-8 shadow-xl rounded-xl border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-headline flex items-center justify-center gap-2 text-primary">
                <Sparkles className="h-8 w-8" />
                Your Virtual Look!
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <img src={generatedImage} alt="AI Generated Try-on" className="rounded-lg border-2 border-primary/10 shadow-2xl max-w-full h-auto" />
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={() => { setGeneratedImage(null); setUserFile(null); setUserPreview(null); }}>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try Another Photo
                </Button>
                <Button size="lg" variant="secondary" onClick={() => router.push("/shop")}>
                  Keep Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-12 pb-8">
          <Button variant="ghost" onClick={() => router.push("/shop")} className="text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
