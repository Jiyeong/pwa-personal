import { Layout } from "@/components/Layout"
import {AddTodo} from "@/components/AddTodo.tsx";
import {RefreshCw} from "lucide-react";
import {TodoList} from "@/components/TodoList.tsx";
import { useTodos } from "@/hooks/useTodos"

export function Todo() {
  const {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos()

  return (
    <Layout>
      <div>
        <h2>todo</h2>
        {/* Add Todo Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <AddTodo onAdd={addTodo} />
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {loading && todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-gray-400" />
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
      </div>
    </Layout>
  )
}