const autocomplete = ({ root, renderOption, onSelectOption, inputValue, fetchData, side }) => {
    root.innerHTML = `
<div>
<div class="dropdown">
    <label for="movieSearch" class="form-label">Movie Search</label>
    <input type="text" class="form-control" id="movieSearch" placeholder="Search for a movie"
        aria-expanded="false">
    <div>
        <ul class="dropdown-menu w-100 rounded-0 rounded-end mt-1 border-top-0 hide"
            aria-labelledby="dropdownMenuButton1">
        </ul>
    </div>
</div>
</div>
<div class="movieDetail mt-3"></div>
`;

    const input = root.querySelector('input');
    const options = root.querySelector('.dropdown-menu');


    const onInput = async (e) => {
        if (!e.target.value) {
            options.classList.add('hide');
            options.classList.remove('show');
            return;
        }
        const optionsFetched = await fetchData(e.target.value);
        options.innerHTML = '';
        options.classList.add('show');
        options.classList.remove('hide');
        if (!optionsFetched) {
            const optionElement = document.createElement('li');
            optionElement.innerText = 'No results found!!';
            optionElement.classList.add('ms-3');
            options.append(optionElement);
            return;
        }
        for (let option of optionsFetched) {
            const optionElement = document.createElement('li');
            optionElement.classList.add('dropdown-item');
            optionElement.innerHTML = renderOption(option);
            options.append(optionElement);
            optionElement.addEventListener('click', async (e) => {
                e.stopPropagation();
                options.classList.add('hide');
                options.classList.remove('show');
                input.value = inputValue(option);
                onSelectOption(option, root, side);
            });
        }
    }

    input.addEventListener('input', debounce(onInput, 500));
}