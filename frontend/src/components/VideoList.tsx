import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Card, CardContent } from "@mui/material";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const LessonList = () => {
  const { data: lessons, isLoading, isError } = trpc.videoRouter.getAllVideoes.useQuery();

  if (isLoading) {
    return <div className="text-background">レッスンを読み込んでいます...</div>;
  }

  if (isError) {
    return <div className="text-background">レッスンの読み込み中にエラーが発生しました。</div>;
  }

  if (!lessons || lessons.length === 0) {
    return <div className="text-background">レッスンが見つかりません。</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {lessons.map((lesson) => (
        <Link
          key={lesson.id}
          href={`/lessons/${lesson.id}`}
          passHref
        >
          <Card
            className="flex flex-col bg-main cursor-pointer"
            style={{ width: "400px", height: "275px", margin: "0 auto" }}
          >
            <div
              className="relative"
              style={{ height: "200px" }}
            >
              <img
                src={lesson.thumbnailUrl || "/placeholder-image.jpg"}
                alt={`${lesson.title} のサムネイル`}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <CardContent
              className="flex flex-col justify-between p-3 text-background bg-main"
              style={{ height: "75px" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-start flex-grow">
                  <h2
                    className="font-bold line-clamp-1 w-full mb-1"
                    style={{ fontSize: "16px" }}
                  >
                    {lesson.title}
                  </h2>
                  <div className="flex items-center">
                    <span
                      className="mr-1"
                      style={{ fontSize: "12px" }}
                    >
                      所要時間: {lesson.duration}分
                    </span>
                    <AccessTimeIcon style={{ fontSize: 14 }} />
                  </div>
                </div>
                <ChevronRightIcon style={{ fontSize: 24 }} />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default LessonList;
