import React, { useState } from 'react';
import { FaPills } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const Refer3: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState<string[]>([]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    };
  
    const handleSubmit = () => {
      if (inputText.trim() !== '') {
        setData(prevData => [...prevData, inputText]);
        setInputText('');
      }
    };
  
    const handleDelete = (index: number) => {
      setData(prevData => prevData.filter((_, i) => i !== index));
    };
  console.log(data)
  return (
    <div className="">
      <div className="">
        ข้อมูลยา/บริการ/หัตถการ
      </div>
      <input
        type="text"
        name=""
        placeholder="ข้อมูลยา/บริการ/หัตถการ"
        className="block w-full rounded-md border-2 py-3 pl-7 pr-20 text-gray-500"
        value={inputText}
        onChange={handleChange}
        onKeyDown={(e) => {if (e.key === 'Enter') handleSubmit()}}
      />
      <div className="rounded-lg overflow-hidden">
        <table className="min-w-full">
          <tbody className='divide-y divide-gray-200 '>
            {data.map((item, index) => (
              <tr key={index} className="flex items-center justify-between">
              <td className="flex items-center px-4 py-2">
                <FaPills className='mr-2 size-8'/>
                <span className="text-lg">{item}</span>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}><ImBin className='mr-4'/></button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Refer3;