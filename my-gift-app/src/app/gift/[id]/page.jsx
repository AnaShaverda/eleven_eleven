import { getDoc, doc, collection, getDocs } from "firebase/firestore"; // Added collection and getDocs
import { db } from "@/lib/firebase";
import dynamic from "next/dynamic";
import Link from "next/link";

const components = {
  "deas-birthday": dynamic(() => import("@/components/gifts/DeasBirthdayGift")),
  "teklas-birthday": dynamic(() =>
    import("@/components/gifts/TeklasBirthdayGift")
  ),
  "anikos-birthday": dynamic(() =>
    import("@/components/gifts/AnikosBirthdayGift")
  ),
  "nikas-birthday": dynamic(() =>
    import("@/components/gifts/NikasBirthdayGift")
  ),
};

// --- ADDED: generateStaticParams function for SSG/ISR ---
export async function generateStaticParams() {
  const giftsCollectionRef = collection(db, "gifts");
  const querySnapshot = await getDocs(giftsCollectionRef);

  // Map the document IDs to the 'params' format expected by Next.js
  const paths = querySnapshot.docs.map((doc) => ({
    id: doc.id,
  }));

  // You can optionally add a fallback setting if you expect new IDs after build time
  // For now, we'll assume all possible IDs are known at build time.
  // If you want new IDs to be generated on demand, you might need { fallback: 'blocking' }
  // or { fallback: true } with a loading state, depending on your Next.js version and needs.
  // For static generation, `paths` is sufficient.
  return paths;
}

export default async function GiftPage({ params }) {
  // --- CORRECTED LINE: Explicitly await 'params' before destructuring 'id' ---
  const { id } = await params; // Awaiting params as per the error message

  if (!id) {
    return (
      <ErrorMessage message="Invalid Gift ID" buttonText="Go Home" href="/" />
    );
  }

  const docRef = doc(db, "gifts", id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    return (
      <NotFound
        message="Oops! The gift you’re looking for doesn’t exist or has been removed."
        buttonText="Back to Home"
        href="/"
      />
    );
  }

  const data = { id: snap.id, ...snap.data() };
  const Component = components[data.component];

  if (!Component) {
    return (
      <ErrorMessage
        message={`Gift "${id}" has unknown component: "${data.component}"`}
        buttonText="Go Home"
        href="/"
      />
    );
  }

  return (
    <main className="min-h-screen">
      <div>
        <Component data={data} />
      </div>
    </main>
  );
}

function NotFound({ message, buttonText, href }) {
  return (
    <main className="min-h-screen bg-gradient-to-r from-red-900 via-red-700 to-red-900 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-7xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
        404
      </h1>
      <p className="text-xl mb-6 max-w-md text-center drop-shadow-md">
        {message}
      </p>
      <Link
        href={href}
        className="px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-full font-semibold shadow-lg transition">
        {buttonText}
      </Link>
    </main>
  );
}

function ErrorMessage({ message, buttonText, href }) {
  return (
    <main className="min-h-screen bg-gradient-to-r from-yellow-600 via-orange-500 to-yellow-600 flex flex-col items-center justify-center text-black p-6">
      <h1 className="text-5xl font-bold mb-4">{message}</h1>
      <Link
        href={href}
        className="px-6 py-3 bg-black text-yellow-400 hover:text-yellow-300 rounded-full font-semibold shadow-md transition">
        {buttonText}
      </Link>
    </main>
  );
}
