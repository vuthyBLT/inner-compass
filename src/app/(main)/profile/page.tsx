"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User as UserIcon, Gem } from "lucide-react";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const { user, logOut, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>
    );
  }
  
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-2xl">
                        {user.email ? getInitials(user.email) : <UserIcon />}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{user.email}</CardTitle>
                    <CardDescription>Your personal account</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold">My Enneagram Type</h3>
                    <p className="text-muted-foreground">Type 9: The Peacemaker (example)</p>
                    <p className="text-sm text-muted-foreground">Complete the Deep Dive to discover your type.</p>
                </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={logOut} variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
            </CardFooter>
        </Card>

        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Gem className="w-5 h-5 text-accent" /> Premium Features</CardTitle>
                <CardDescription>Unlock advanced simulations and in-depth reports.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Support the development of EnneaSim and gain access to exclusive content.</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                    {/* Placeholder for PayPal Button */}
                    Upgrade with PayPal
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
