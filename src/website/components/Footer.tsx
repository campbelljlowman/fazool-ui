import { Separator } from "@/components/ui/separator"

function Footer() {
  return (
    <>
    <Separator/>
    <div className='flex flex-col items-center py-4 gap-2'>
        <a className='text-xs text-muted-foreground' href='https://forms.gle/yzQZndKEwGrn5KVb7' target='_blank'>
            Report a bug
        </a>
        <a className='text-xs text-muted-foreground' href='https://forms.gle/F7dTrLGo3TyuzRoPA' target='_blank'>
            Leave feedback
        </a>
    </div>
    </>
  )
}

export default Footer