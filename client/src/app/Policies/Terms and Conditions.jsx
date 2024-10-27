import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import { ScrollArea } from "../../components/ui/scroll-area"
import { toast } from "../../components/ui/use-toast"

export default function AcceptTerms() {
  const [accepted, setAccepted] = useState(false)
  const router = useRouter()

  const handleAccept = async () => {
    if (accepted) {
      try {
        // Send acceptance to backend
        const response = await fetch('/api/acceptTerms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: "user-id" }), // Replace "user-id" with actual user ID
        })

        if (!response.ok) {
          throw new Error("Failed to save acceptance")
        }

        toast({
          title: "Terms Accepted",
          description: "Thank you for accepting our terms and conditions.",
        })
        router.push('/') // Redirect to home page after acceptance
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an issue saving your acceptance. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Action Required",
        description: "Please read and accept the terms and conditions to continue.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Accept Terms and Conditions</h1>
      <ScrollArea className="h-[400px] w-full border rounded-md p-4 mb-4">
        <div className="prose max-w-none">
          {/* Terms content here */}
        </div>
      </ScrollArea>
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox id="terms" checked={accepted} onCheckedChange={setAccepted} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have read and agree to the terms and conditions
        </label>
      </div>
      <div className="flex space-x-4">
        <Button onClick={handleAccept}>Accept and Continue</Button>
        <Button variant="outline" asChild>
          <Link href="/">Cancel</Link>
        </Button>
      </div>
    </div>
  )
}