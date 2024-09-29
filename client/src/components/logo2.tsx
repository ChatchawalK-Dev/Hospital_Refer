import Image1 from './image/Logo1.png'
import Image2 from './image/Logo2.png'

const Logo: React.FC = () => {
  return (
    <div className="flex flex-wrap">
    <div className="relative h-72 w-64">
      <img className="absolute inset-x-0 top-28" src={Image2} alt='image'/>
      <img className="absolute inset-y-0 -left-8 w-48" src={Image1} alt='image' />
    </div>
    </div>
  );
}

export default Logo;
