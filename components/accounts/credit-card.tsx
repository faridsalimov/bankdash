"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import type { Card as CardType } from "@/lib/types";

interface CreditCardProps {
  card: CardType;
}

export function CreditCard({ card }: CreditCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">My Card</h2>
        <button className="text-sm text-primary">See All</button>
      </div>
      <Card
        key={card.id}
        className={`${
          card.type === "credit" ? "bg-primary" : "bg-card"
        } p-6 rounded-2xl shadow-sm relative`}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <p
              className={`text-sm ${
                card.type === "credit"
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground"
              }`}
            >
              Balance
            </p>
            <p
              className={`text-2xl font-semibold ${
                card.type === "credit"
                  ? "text-primary-foreground"
                  : "text-foreground"
              }`}
            >
              ${card.balance.toLocaleString()}
            </p>
          </div>
          <Image
            src={`${
              card.cardType === "mastercard" ? "/mastercard.svg" : "/visa.webp"
            }`}
            alt={`${card.cardType === "mastercard" ? "Mastercard" : "Visa"}`}
            width={40}
            height={40}
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p
                className={`text-sm ${
                  card.type === "credit"
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                CARD HOLDER
              </p>
              <p
                className={`font-medium ${
                  card.type === "credit"
                    ? "text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                {card.cardHolder}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm ${
                  card.type === "credit"
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                VALID THRU
              </p>
              <p
                className={`font-medium ${
                  card.type === "credit"
                    ? "text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                {card.validThru}
              </p>
            </div>
          </div>
          <p
            className={`text-lg tracking-widest ${
              card.type === "credit"
                ? "text-primary-foreground"
                : "text-foreground"
            }`}
          >
            {card.cardNumber}
          </p>
        </div>
      </Card>
    </Card>
  );
}
