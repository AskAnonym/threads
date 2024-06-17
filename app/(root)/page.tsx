import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import PublicThreadCard from "@/components/cards/PublicThreadCard";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();

  const userInfo = await fetchUser(user?.id);
  if (user && !userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    user ? 30 : 10,
    userInfo?.id
  );

  return (
    <>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          user && (
            <>
              {result.posts.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  createdAt={post.createdAt}
                  comments={post.children}
                  firstReplyContent={post.children[0]?.text}
                  summaryContent={true}
                  viewMode="feed"
                  askerId={post.askerId}
                  currentUserObjectId={userInfo._id}
                />
              ))}
            </>
          )
        )}

        {!user && (
          <>
            {result.posts.map((post) => (
              <PublicThreadCard
                key={post._id}
                id={post._id}
                content={post.text}
                author={post.author}
                createdAt={post.createdAt}
                firstReplyContent={post.children[0]?.text}
              />
            ))}
          </>
        )}
      </section>

      {user && result.posts.length === 30 && (
        <Pagination
          path="/"
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      )}
    </>
  );
}

export default Home;
