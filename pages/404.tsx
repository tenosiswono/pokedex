import Layout from "@/components/Layout";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <Layout title="404 Not Found">
      <div className="flex justify-center flex-col items-center mt-10">
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        Go back home
      </Link>
      </div>
    </Layout>
  );
}
