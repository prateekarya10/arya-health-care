const SelectField = ({
	label,
	id,
	options,
	value,
	onChange,
	className = "",
}) => {
	return (
		<div className={`flex flex-col gap-2 items-start w-full ${className}`}>
			<label htmlFor={id} className="text-[16px] font-medium text-black">
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={onChange}
				className="bg-[#ECF1FF] text-[16px] px-3 h-[45px] w-full rounded-xl outline-none cursor-pointer text-[#809CFF] appearance-none">
				<option value="" className="">
					Select Role
				</option>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectField;
