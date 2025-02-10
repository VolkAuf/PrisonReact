import { ReactNode } from "react";

//TODO: use option settings
function ContentCard({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="max-sm:w-svw max-sm:h-svh min-sm:border-3 min-sm:rounded-3xl min-sm:border-green-600 bg-green-600/15">
        <div className="flex min-h-full flex-col justify-center px-6 py-8">
          <div className="sm:mx-auto sm:w-full">{children}</div>
        </div>
      </div>
    </>
  );
}

export default ContentCard;
