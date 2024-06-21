import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchActiveUsers, fetchUser } from "@/lib/actions/user.actions";
import PublicThreadCard from "@/components/cards/PublicThreadCard";
import Avatar from "@/components/shared/Avatar";

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

  const activeUsers = await fetchActiveUsers({ limit: 20 });

  return (
    <>
      <section className="flex items-center justify-center gap-4">
        <ul className="mb-8 flex w-full items-start justify-between space-x-3 overflow-x-scroll rounded py-4 drop-shadow-xl">
          {activeUsers.users?.map((user) => (
            <li
              className="flex w-[55px] flex-none flex-col items-center justify-center space-y-1 truncate text-[12px] font-bold text-primary-500 relative"
              key={user.username}
            >
              <div className=" absolute top-0 right-0 w-5 h-5 bg-primary-500/80 text-white rounded-full z-10 text-center">
                {user.filteredPostsCount}
              </div>
              <Avatar
                author={{ image: user.image, username: user.username }}
                variant="owner"
                className=" relative"
              />
              {user.username.slice(0, 7)}
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-10">
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

      {user && (
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
