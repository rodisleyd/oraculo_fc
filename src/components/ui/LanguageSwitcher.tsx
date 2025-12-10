import { useTranslation } from 'react-i18next';
import { Button } from './Button';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex gap-2">
            <Button
                variant={i18n.language.startsWith('pt') ? 'primary' : 'outline'}
                size="sm"
                onClick={() => changeLanguage('pt')}
            >
                PT
            </Button>
            <Button
                variant={i18n.language.startsWith('en') ? 'primary' : 'outline'}
                size="sm"
                onClick={() => changeLanguage('en')}
            >
                EN
            </Button>
        </div>
    );
};
