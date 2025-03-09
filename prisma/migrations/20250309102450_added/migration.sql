-- AddForeignKey
ALTER TABLE "urlshortener" ADD CONSTRAINT "urlshortener_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
