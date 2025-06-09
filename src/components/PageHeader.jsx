import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, rightContent, className ,textSize="text-[20px]"}) => {
	const navigate = useNavigate();

	return (
		<div className={`w-full flex items-center justify-between  px-2 text-[#2260FF] ${className? className:"py-6"}`}>
			<div className="w-[40px]">
				<button onClick={() => navigate(-1)}>
					<FaChevronLeft className="text-2xl" />
				</button>
			</div>
			<div className={`${textSize} font-semibold text-center flex-1 text-[#2260FF]`}>
				{title}
			</div>
			<div className="w-[40px] text-right">{rightContent}</div>
		</div>
	);
};

export default PageHeader;
