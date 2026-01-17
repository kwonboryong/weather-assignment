import { useNavigate } from "react-router-dom";
import { BackButton } from "@/shared/ui/components/BackButton";
import { WeatherSummaryCard } from "@/entities/weather/ui/WeatherSummaryCard";
import { useBookmarks } from "@/features/bookmark-location/model/useBookmarks";
import { useBookmarkSummaries } from "@/features/bookmark-location/model/useBookmarkSummaries";
import { useAliases } from "@/features/bookmark-location/model/useBookmarkAliases";
import { useState } from "react";
import { EditAliasDialog } from "@/features/bookmark-location/ui/EditAliasDialog";

export default function BookmarkPage() {
  const navigate = useNavigate();

  const { ids, remove } = useBookmarks();

  // 중복 제거 + 최대 6개
  const visibleIds = Array.from(new Set(ids)).slice(0, 6);

  // 북마크 데이터
  const summaries = useBookmarkSummaries(visibleIds);

  // 예외 처리
  const isEmpty = visibleIds.length === 0;

  // 별칭
  const { getAlias, setAlias, removeAlias } = useAliases();

  // 별칭 다이얼로그
  const [editingId, setEditingId] = useState<string | null>(null);
  const [aliasInput, setAliasInput] = useState("");

  // 다이얼로그 열기
  const openEditAlias = (id: string) => {
    setEditingId(id);
    setAliasInput(getAlias(id));
  };

  // 다이얼로그 닫기
  const closeEditAlias = () => {
    setEditingId(null);
    setAliasInput("");
  };

  // 별칭 저장
  const saveAlias = () => {
    if (!editingId) return;

    setAlias(editingId, aliasInput);
    closeEditAlias();
  };

  // 북마크 삭제
  const removeBookmark = (id: string) => {
    remove(id);
    removeAlias(id);
  };

  return (
    <div className="overflow-hidden h-dvh bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="w-full max-w-6xl px-4 py-6 mx-auto sm:px-6 sm:py-10">
        {/* 뒤로가기 */}
        <div className="mb-6 sm:mb-10">
          <BackButton ariaLabel="뒤로가기" onClick={() => navigate(-1)} />
        </div>

        {/* 페이지 제목 */}
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-indigo-500 select-none sm:mb-10 sm:text-[40px]">
          즐겨찾기
        </h1>

        {/* 즐겨찾기 카드 그리드 */}
        {isEmpty ? (
          <p className="py-10 text-sm text-center text-gray-500">
            아직 즐겨찾기한 지역이 없어요.
            <br />
            홈에서 지역을 검색하고, 즐겨찾기에 추가해보세요.
          </p>
        ) : (
          <section className="grid grid-cols-1 gap-4 justify-items-center sm:gap-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {visibleIds.map((id, idx) =>
              summaries[idx]?.isPending ? (
                <div
                  key={id}
                  className="w-full max-w-[320px] h-[220px] rounded-xl bg-white/70 flex items-center justify-center text-slate-700"
                >
                  불러오는 중...
                </div>
              ) : summaries[idx]?.isError || !summaries[idx]?.data ? (
                <div
                  key={id}
                  className="w-full max-w-[320px] h-[220px] rounded-xl bg-white/70 flex flex-col items-center justify-center gap-3 text-slate-700"
                >
                  <span className="text-sm">
                    날씨 정보를 불러올 수 없습니다.
                  </span>
                  <button
                    type="button"
                    className="text-sm text-indigo-600 underline"
                    onClick={() => remove(id)}
                  >
                    즐겨찾기에서 제거
                  </button>
                </div>
              ) : (
                <WeatherSummaryCard
                  key={id}
                  variant="favorite"
                  data={summaries[idx]!.data}
                  onClick={() =>
                    navigate(`/location/${encodeURIComponent(id)}`)
                  }
                  onRemove={() => removeBookmark}
                  alias={getAlias(id) || undefined}
                  onEditAlias={() => openEditAlias(id)}
                />
              )
            )}
          </section>
        )}
      </main>

      <EditAliasDialog
        open={Boolean(editingId)}
        value={aliasInput}
        onChange={setAliasInput}
        onClose={closeEditAlias}
        onSave={saveAlias}
      />
    </div>
  );
}
