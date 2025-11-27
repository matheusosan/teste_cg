interface ItemsPerPageSelectProps {
    itemsPerPage: number;
    handleItemsPerPageChange: (num: number) => void;
}

export const ItemsPerPageSelect = ({ handleItemsPerPageChange, itemsPerPage}: ItemsPerPageSelectProps) => {
    return (
        <select
        value={itemsPerPage}
        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
      >
        {[3, 5, 10, 20].map((num) => (
          <option key={num} value={num}>
            {num} por página
          </option>
        ))}
      </select>
    )
}
