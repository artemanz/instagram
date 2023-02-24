import { TFirebaseUser } from "#/@types/users";
import useSuggestions from "./hooks/useSuggestions";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import Suggestion from "./Suggestion";

interface Props {}

const Suggestions: FC<Props> = () => {
  const [profiles] = useSuggestions();

  function createSuggestion(suggestion: TFirebaseUser) {
    return <Suggestion suggestion={suggestion} key={suggestion.user_name} />;
  }

  const SuggestedProfiles = () => {
    if (!profiles) return <Skeleton count={1} height={120} />;

    if (!profiles.length) return <p>No suggestions.</p>;

    return <ul className="space-y-4">{profiles.map(createSuggestion)}</ul>;
  };

  return (
    <div className="rounded flex flex-col gap-4">
      <h3 className="font-bold">Suggestions for you</h3>
      <hr />
      <SuggestedProfiles />
    </div>
  );
};

export default Suggestions;
