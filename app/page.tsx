import QuestionForm from "./components/QuestionForm"

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <div className="container mx-auto p-4 max-w-3xl flex-grow flex flex-col">
        <h1 className="text-3xl font-bold mb-6">AI Chat Assistant</h1>
        <QuestionForm />
      </div>
    </main>
  )
}

