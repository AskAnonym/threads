import { currentUser } from "@clerk/nextjs";

import UserCard from "../cards/UserCard";

import { fetchNewJoiners } from "@/lib/actions/user.actions";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const result = await fetchNewJoiners();

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">New Joiners</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          {result.users.length > 0 ? (
            <>
              {result.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
