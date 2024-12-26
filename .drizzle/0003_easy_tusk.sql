ALTER TABLE "friend_requests" DROP CONSTRAINT "friend_requests_senderId_recipientId_pk";--> statement-breakpoint
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_id_pk" PRIMARY KEY("id");