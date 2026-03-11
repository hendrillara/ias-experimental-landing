import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <h1 className="text-4xl font-bold mb-12">IAS Experimental Routes</h1>
      <div className="flex flex-col gap-6">
        <Link 
          href="/ai-engineers" 
          className="px-8 py-4 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-xl hover:bg-teal-500/20 transition-all text-center"
        >
          /ai-engineers
        </Link>
        <Link 
          href="/product-managers" 
          className="px-8 py-4 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/20 transition-all text-center"
        >
          /product-managers
        </Link>
        <Link 
          href="/decision-makers" 
          className="px-8 py-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/20 transition-all text-center"
        >
          /decision-makers
        </Link>
      </div>
    </main>
  );
}
