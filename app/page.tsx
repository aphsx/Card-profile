import ProfileCard from '@/components/ProfileCard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
      <ProfileCard
        name="John Doe"
        role="Software Engineer"
        bio="Passionate about building scalable web applications and sharing knowledge with the developer community."
        avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        stats={{
          projects: 42,
          followers: 1250,
          following: 89
        }}
        onConnect={() => console.log('Connect clicked')}
      />
    </main>
  )
}