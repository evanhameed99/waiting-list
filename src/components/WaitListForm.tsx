"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";
const WaitListForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const rawResponse = await fetch("/api/waitinglist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const content = await rawResponse.json();

      if (content.status) {
        toast.success("Thank you for joining the waitlist!");
        setEmail("");
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding your email to the waitlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  px-4 md:px-6">
      <Toaster />
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
          Be the First to Know
        </h2>
        <p className="max-w-[700px] text-gray-800/90 md:text-xl">
          Join our waitlist to get early access when we launch. We&apos;re
          building something special and we want you to be part of it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[600px] mt-2  p-2 rounded-lg">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 border-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="h-12" onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-500">Thank you for joining the waitlist!</p>
        )}
      </div>
    </div>
  );
};

export default WaitListForm;
