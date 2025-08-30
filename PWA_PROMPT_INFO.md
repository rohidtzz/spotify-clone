✨ Simple PWA Prompt Component
==============================

🎯 DESIGN PHILOSOPHY:
• Minimalist & clean design
• Non-intrusive user experience  
• Professional appearance
• Mobile-first responsive

🔧 FEATURES:
• Install Prompt: Small pill button (⬇️ Install)
• Update Prompt: Orange pill button (🔄 Update)  
• Auto-dismiss with X button
• Hover animations & smooth transitions
• 5-second delay before showing install prompt

🎨 STYLING:
• Green pill for install (#1db954 - Spotify color)
• Orange pill for update (#ff9800)
• Fixed position: top-right corner
• Glassmorphism effect with backdrop-blur
• Smooth hover effects & micro-animations

📱 USER EXPERIENCE:
• Shows after 5 seconds of page interaction
• Only shows if not already installed
• Easy to dismiss without being annoying
• Click to install/update, X to dismiss
• Mobile responsive design

🔄 FUNCTIONALITY:
• Install: Uses beforeinstallprompt API
• Update: Communicates with Service Worker
• Skip waiting: Forces immediate update
• Auto-reload after update applied
• Console logging for debugging

💡 BENEFITS:
• Much less "lebay" than previous popups
• Subtle but effective
• Professional appearance
• Doesn't interrupt user workflow
• Easy to customize colors/position

This creates a modern, clean PWA experience without being intrusive! 🚀
