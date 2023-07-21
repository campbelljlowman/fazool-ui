import { useNavigate } from 'react-router-dom'
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import { Button } from "@/components/ui/button"
import SessionMockup from '../../assets/images/session-mock-up.png'
import HowItWorksCard from './HowItWorksCard';
import { Separator } from '@/components/ui/separator';
import { Link, MonitorPlay, ScanLine, Music } from 'lucide-react'

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className='welcome-page'>
            <div>
                <div className='flex justify-between items-center mx-4 my-2'>
                    <LogoIcon className='w-48'/>
                    <div>
                        <Button className='m-3' variant={'secondary'} onClick={() => {navigate("/join");}}>Join Session</Button>
                        <Button className='m-3' onClick={() => {navigate("/register");}}>Sign Up</Button>
                        <Button className='m-3' variant={'secondary'} onClick={() => {navigate("/login");}}>Login</Button>
                    </div>
                </div>
                <Separator/>
            </div>
            <div className='flex justify-around items-center mx-4 my-12'>
                <div className='flex flex-col w-1/2 p-2'>
                    <h1 className='text-4xl font-extrabold p-2'>Democratized DJing</h1>
                    <p className='text-2xl font-semibold p-2'>Fazool allows a group of people to vote on which songs get played.</p>
                    <ul className='p-2'>
                        <li>Connects with popular streaming services.</li>
                        <li>Basic functionality is completely free.</li>
                        <li>No account required for voters.</li>
                        {/* <li className='title-medium' style={{listStylePosition: 'inside', lineHeight: '1.5'}}>No account required for voters</li> */}
                    </ul>
                </div>
                <div className='w-1/2 flex justify-center items-center'>
                        <img className='w-5/6' src={SessionMockup} alt='Mock up of a Fazool session'/>
                </div>
            </div>
            <Separator/>
            <div className='flex justify-around items-center mx-4 my-12'>
                <h1 className='text-4xl font-extrabold p-4 w-1/3'>How does Fazool work?</h1>
                <div className='w-2/3'>
                    <div className='flex justify-around'>
                        <HowItWorksCard title='Connect' description='Connect Fazool to your favorite music streaming service. Currently supported ones include Spotify.' icon={Link}/>
                        <HowItWorksCard title='Host' description='Start a Fazool session and display it on a screen where everyone can see.' icon={MonitorPlay}/>
                    </div>
                    <div className='flex justify-around'>
                        <HowItWorksCard title='Join' description='Anyone can join a Fazool session on their phone. Then they can view and vote for songs they want to hear.' icon={ScanLine}/>
                        <HowItWorksCard title='Listen' description='Fazool will make sure the most popular songs get played!' icon={Music}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome; 