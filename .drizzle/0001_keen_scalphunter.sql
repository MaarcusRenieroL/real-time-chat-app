CREATE TABLE "friends" (
	"userId" text NOT NULL,
	"friendId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "friends_userId_friendId_pk" PRIMARY KEY("userId","friendId")
);
--> statement-breakpoint
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friends" ADD CONSTRAINT "friends_friendId_user_id_fk" FOREIGN KEY ("friendId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;