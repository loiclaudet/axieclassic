import Link from "next/link";
import { LuExternalLink as ExternalLinkIcon } from "react-icons/lu";
import type { Battle, BattleWithProfiles } from "~/lib/definitions";
import { BATTLE_LIMIT } from "~/lib/constant";
import { getProfileBattles } from "~/data";
import { Fighters } from "~/components/fighters";
import { DashedLine } from "~/components/ui/dashed-line";
import { BattleDetails } from "~/components/battle-details";
import { ColoredName } from "~/components/colored-name";

type BattlesProps = {
  clientID: string;
};

export const Battles = async ({ clientID }: BattlesProps) => {
  const battles = await getProfileBattles(clientID, { limit: BATTLE_LIMIT });

  if ("error" in battles) {
    return <p className="flex-grow text-center">{battles.message}</p>;
  }

  if (battles.length === 0) {
    return (
      <div>
        <p className="flex-grow text-center">No battles found for user</p>
        <p className="flex-grow text-center font-bold">{clientID}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4 overflow-hidden">
      {battles.map((battle) => {
        return (
          <li key={battle.uuid} className="bg-neutral-aside-dark">
            <Battle battle={battle} />
          </li>
        );
      })}
    </ul>
  );
};

type BattleProps = {
  battle: BattleWithProfiles;
};

async function Battle({ battle }: BattleProps) {
  const {
    clientID,
    createdAt,
    pvpType,
    team,
    uuid,
    winner,
    clientProfile,
    opponentProfile,
  } = battle;
  const isDraw = winner === "draw";
  const isVictory = winner === clientID;
  const playerFighterIDs = team.find((t) => t.owner === clientID)!.fighterIDs;
  const opponentTeam = team.find((t) => t.owner !== clientID)!;
  const { owner: opponentID, fighterIDs: opponentFighterIDs } = opponentTeam;
  const durationFromNow = calculateDurationFromNow(createdAt);

  return (
    <div className="flex border-y border-b border-y-neutral-separator-dark">
      <div className="flex flex-col sm:flex-row">
        <div>
          <p className="pl-4 pt-2 text-sm">
            <ColoredName name={clientProfile.name} />
          </p>
          <Fighters lookRight fighterIDs={playerFighterIDs} />
        </div>
        <DashedLine className="sm:hidden" />
        <DashedLine className="hidden sm:block" direction="vertical" />
        <BattleDetails
          pvpType={pvpType}
          durationFromNow={durationFromNow}
          status={isDraw ? "draw" : isVictory ? "victory" : "defeat"}
          uuid={uuid}
        />
        <DashedLine className="hidden sm:block" direction="vertical" />
        <DashedLine className="sm:hidden" />
        <div>
          <Link
            className="group flex items-center gap-1 pb-0 pl-4 pt-2 transition-colors hover:text-neutral-100 hover:underline"
            prefetch={false}
            href={`/profile/${opponentID}`}
          >
            <p className="text-sm">
              <ColoredName name={opponentProfile.name} />
            </p>
            <ExternalLinkIcon className="h-3 w-3 text-neutral-100 transition-all group-hover:scale-125" />
          </Link>
          <Fighters fighterIDs={opponentFighterIDs} />
        </div>
      </div>
    </div>
  );
}

const calculateDurationFromNow = (date: string) =>
  new Date().getTime() - new Date(date).getTime();
