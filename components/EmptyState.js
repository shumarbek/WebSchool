import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'Hali kontent mavjud emas', description = 'Admin panel orqali kontent qo‘shilgandan so‘ng bu bo‘limda ko‘rinadi.', icon: Icon = Inbox }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-dark-50/70 p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}
