import { RefreshCw, WifiOff } from "lucide-react"
import { AddTodo } from "@/components/AddTodo"
import { TodoList } from "@/components/TodoList"
import { useTodos } from "@/hooks/useTodos"
import "./App.css"
import { useAppUpdate } from '@/hooks/useAppUpdate'
// import {Button} from "@/components/ui/button.tsx"
import { Layout } from "@/components/Layout"

// 루트인 홈 페이지
function App() {
  const {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refetch,
    manualSync,
    isOnline,
    isSyncing,
    pendingOperationsCount,
  } = useTodos()
  const { updateAvailable, updateError, updateApp } = useAppUpdate()


  return (
    <Layout>
      {/* App Description */}
      <div className="text-center mb-6">
        <p className="text-gray-600 text-sm">
          A shared Progressive Web App • No sign-up required
        </p>

        {error && (
            <div
                className="mt-3 flex items-center justify-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <WifiOff className="w-4 h-4"/>
              {error}
            </div>
        )}
      </div>

      {/* Add Todo Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <AddTodo onAdd={addTodo}/>
      </div>

      {/* Todo List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {loading && todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-gray-400"/>
              Loading shared todos...
            </div>
        ) : (
            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
            />
        )}
      </div>
    </Layout>
    /*<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/!* Fixed Navigation *!/}
      <Navigation
          isOnline={isOnline}
          isSyncing={isSyncing}
          pendingOperationsCount={pendingOperationsCount}
          error={error}
          onRefresh={refetch}
          onManualSync={manualSync}
          loading={loading}
      />
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

      <PullToRefresh onRefresh={refetch}>
        {/!* Main Content - with top padding to account for fixed nav *!/}
        <div className="container mx-auto px-4 pt-40 pb-8 max-w-2xl mobile-content">
          {/!* iOS Install Instructions *!/}
          <IOSInstallInstructions/>

          {/!* App Description *!/}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              A shared Progressive Web App • No sign-up required
            </p>

            {error && (
                <div
                    className="mt-3 flex items-center justify-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <WifiOff className="w-4 h-4"/>
                  {error}
                </div>
            )}
          </div>

          {/!* Add Todo Form *!/}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <AddTodo onAdd={addTodo}/>
          </div>

          {/!* Todo List *!/}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {loading && todos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-gray-400"/>
                  Loading shared todos...
                </div>
            ) : (
                <TodoList
                    todos={todos}
                    onToggle={toggleTodo}
                    onUpdate={updateTodo}
                    onDelete={deleteTodo}
                />
            )}
          </div>

          {/!*<CameraButton />*!/}

          {/!* Footer *!/}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>Shared todo list • Works offline • Install as an app</p>
          </div>
        </div>
      </PullToRefresh>
    </div>*/
  )
}

export default App