import React from "react";

const EmptyCard = ({ isearch }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {isearch ? (
        <p className="w-1/2 text-[18px] font-medium text-slate-700 text-center leading-7 mt-5">
          No Note Found of given Title, Content Or Tags.
        </p>
      ) : (
        <p className="w-1/2 text-[18px] font-medium text-slate-700 text-center leading-7 mt-5">
          Start creating your first note! Click the 'Add' button to write down
          your thoughts,ideas, and more. Let's get started!
        </p>
      )}
    </div>
  );
};

export default EmptyCard;
