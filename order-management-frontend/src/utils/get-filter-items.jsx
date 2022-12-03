import { AiOutlinePlus } from "react-icons/ai";

const getSearchAddFilter = (t, config = { addTextKey: '', addIcon: '' }) => {
    return {
        left: [{ 
            type: 'search', 
            key: 'search', 
            label: t('search-for'), 
            value: '' 
        }
        ],
        right: [{ 
            type: 'button', 
            key: 'add', 
            label: <div className="d-flex">
                { config?.addIcon || <AiOutlinePlus className="mt-1 mx-1"/>}
                <p className="text-uppercase m-0">{t(config?.addTextKey || "add")}</p>
            </div>
        }
        ]
    }
}

export {
    getSearchAddFilter,
}