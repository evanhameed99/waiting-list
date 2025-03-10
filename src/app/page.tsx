import Link from "next/link";
import { Button } from "@/components/ui/button";
import WaitListForm from "@/components/WaitListForm";
import { features, title, appName, youtubeVideoId } from "@/constants";
export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold ">{appName}</span>
          </div>

          <div>
            <Button className="" asChild>
              <Link href="#waitlist">Join Waitlist</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center w-full ">
        <section>
          <div className="pt-20">
            <h1
              className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-800"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div className="flex flex-col gap-2 mt-4 text-xl font-medium text-gray-800">
              {features.map((feature, idx) => (
                <p key={idx}>{feature}</p>
              ))}
            </div>
          </div>
        </section>
        <section className=" flex justify-center items-center">
          <div className="py-8">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section id="waitlist" className="pb-20">
          <WaitListForm />
        </section>
      </main>
      <footer className="w-full py-4 border-t border-gray-200 text-center text-gray-800">
        <p>
          &copy; {new Date().getFullYear()} {appName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
