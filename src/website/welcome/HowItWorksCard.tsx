import './HowItWorksCard.css'

interface HowItWorksCardProps {
    title: string,
    description: string
    icon: string
}
function HowItWorksCard({title, description, icon}: HowItWorksCardProps) {
  return (
    <div className="how-it-works-card">
        <div className='how-it-works-card-inline'>
            <div className="display-medium">
                {title}
            </div>
            <span className="material-symbols-rounded" style={{fontSize: '48px'}}>{icon}</span>
        </div>
        <div className="body-large" style={{lineHeight: '1.5'}}>
            {description}
        </div>
    </div>
  )
}

export default HowItWorksCard