"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";


export function Chatbot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [previousResponses, setPreviousResponses] = useState([]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      role: "user", 
      content: input, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true); // Start loading

    try {
      // Construct the context for the chat request
      const context = {
        user_question: input,
        previous_questions: previousQuestions,
        previous_responses: previousResponses,
        feedback: "incomplete",
      };

      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(context),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from the server");
      }

      const data = await response.json();

      // Add assistant's response to messages
      const assistantMessage = {
        role: "assistant",
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Add follow-up question to messages if it exists
      if (data.follow_up_prompt) {
        const followUpMessage = {
          role: "assistant",
          content: `${data.follow_up_prompt}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFollowUp: true, // to differentiate follow-up messages
        };
        setMessages((prev) => [...prev, followUpMessage]);
      }

      // Update the previous questions and responses for the next request
      setPreviousQuestions((prev) => [...prev, input]);
      setPreviousResponses((prev) => [...prev, data.response]);

    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: t("error_message"),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4"
      >
        <MessageSquare className="mr-2 h-4 w-4" /> {t('Ai.button')}
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{t("Ai_chat.h2")}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-[calc(100vh-120px)]">
            <ScrollArea className="flex-grow mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs text-gray-500 mt-1">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-left">
                  <div className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800">
                    <span className="loader">...</span>
                  </div>
                </div>
              )}
            </ScrollArea>
            <div className="flex">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={t("Ai_chat.search")}
                className="flex-grow mr-2"
              />
              <Button onClick={handleSendMessage}>{t('Ai_chat.buttom')}</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
