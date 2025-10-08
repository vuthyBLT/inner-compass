"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Bot, ClipboardList, Library, User } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      {user ? (
        <LoggedInView email={user.email} />
      ) : (
        <GuestView />
      )}
    </div>
  );
}

function GuestView() {
  return (
    <>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Hello to <span className="text-accent-foreground">EnneaSim</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
          Discover your Enneagram type, understand your personality, and simulate interactions to improve your relationships.
        </p>
         <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <ClipboardList className="w-8 h-8 text-accent" />
              <CardTitle>Quick Check</CardTitle>
            </div>
            <CardDescription>A brief questionnaire for a quick personality assessment.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Get an initial glimpse into your Enneagram type with just a few key questions. Perfect for starting your journey of self-discovery.</p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild className="w-full">
              <Link href="/quick-check">Start Quick Check <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Library className="w-8 h-8 text-accent" />
              <CardTitle>Deep Dive</CardTitle>
            </div>
            <CardDescription>An extensive test for a detailed personality report.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Explore the nuances of your personality with our comprehensive assessment, providing scores and rankings for all nine Enneagram types.</p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild className="w-full">
              <Link href="/deep-dive">Take the Deep Dive <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col md:col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Bot className="w-8 h-8 text-accent" />
              <CardTitle>Simulations</CardTitle>
            </div>
            <CardDescription>Simulate interactions with different Enneagram types.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Gain insights into communication styles and potential conflicts by role-playing scenarios with our AI-powered simulation tool.</p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild className="w-full">
              <Link href="/simulations">Run a Simulation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
}

function LoggedInView({ email }: { email: string | null }) {
    return (
        <section className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                Welcome Back!
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
                {email ? `You're signed in as ${email}.` : "You're signed in."}
            </p>
            <p className="mt-2 max-w-2xl mx-auto text-md text-muted-foreground">
                You can now access all features. What would you like to do next?
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="/simulations">
                        <Bot className="mr-2 h-5 w-5" />
                        Run a Simulation
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/profile">
                        <User className="mr-2 h-5 w-5" />
                        Go to Your Profile
                    </Link>
                </Button>
            </div>
        </section>
    );
}
