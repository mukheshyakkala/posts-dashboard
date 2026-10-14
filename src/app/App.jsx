
import { lazy, Suspense } from "react";
import LoadingFallback from "../shared/components/LoadingFallback";

const PostsPage = lazy(
  () => import("../features/posts/pages/PostsPage")
);

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PostsPage />
    </Suspense>
  );
}