import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface HowItWorksCardProps {
    title: string,
    description: string,
    icon: LucideIcon
}
function HowItWorksCard({title, description, icon}: HowItWorksCardProps) {
  return (
    <Card className='w-2/5 m-5 p-2'>
        <CardHeader>
            <CardTitle className='flex justify-between'>
                {title}
                {React.createElement(icon, {className: 'h-8 w-8'})}
            </CardTitle>
        </CardHeader>
        <CardContent>
            {description}
        </CardContent>
    </Card>
  )
}

export default HowItWorksCard