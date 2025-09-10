import { Navigation } from "./Navigation"
import { useAppUpdate } from "@/hooks/useAppUpdate"
import { Button } from "./ui/button"
import {IOSInstallInstructions} from "@/components/InstallButton.tsx";
import {PullToRefresh} from "@/components/PullToRefresh.tsx"

interface LayoutProps {
  children: React.ReactNode
  navigation?: {
    isOnline: boolean
    isSyncing: boolean
    pendingOperationsCount: number
    error: string | null
    onRefresh: () => void
    onManualSync: () => Promise<boolean>
    loading: boolean
  }
  onPageRefresh?: () => Promise<void> // 페이지별 리프레시 핸들러 추가
}

export function Layout({
 children,
 navigation = {
   isOnline: true,
   isSyncing: false,
   pendingOperationsCount: 0,
   error: null,
   onRefresh: () => {},
   onManualSync: async () => false,
   loading: false,
 },
 onPageRefresh // 페이지별 리프레시 핸들러
}: LayoutProps) {

  const { updateAvailable, updateError, updateApp } = useAppUpdate()

  // 페이지별 리프레시 처리
  const handleRefresh = async () => {
    if (onPageRefresh) {
      await onPageRefresh()
    } else {
      // 기본 리프레시 동작
      navigation.onRefresh()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation {...navigation} />

      {updateAvailable && (
          <div className="fixed bottom-4 left-4 right-4 bg-blue-200 text-black p-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between">
              <p>새로운 버전이 있습니다.</p>
              <Button onClick={updateApp} variant="outline" size="sm" disabled={!!updateError}>
                업데이트
              </Button>
            </div>
            {updateError && (
                <p className="text-red-600 text-sm mt-2">{updateError}</p>
            )}
          </div>
      )}
      <PullToRefresh onRefresh={handleRefresh}>
        {/* Main Content - with top padding to account for fixed nav */}
        <div className="container mx-auto px-4 pt-40 pb-8 max-w-2xl mobile-content">
          {/* iOS Install Instructions */}
          <IOSInstallInstructions/>
          {children}
        </div>

        {/*<CameraButton />*/}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Shared todo list • Works offline • Install as an app</p>
        </div>
      </PullToRefresh>
    </div>
  )
}