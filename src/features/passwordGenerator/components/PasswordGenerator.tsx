import {useState} from "react";
import {Button} from "@/shared/ui/Button/Button.tsx";
import {Input} from "@/shared/ui/Input/Input.tsx";
import {generatePassword, type PasswordOptions} from "@/features/passwordGenerator";

type PasswordGeneratorProps = {
    onGenerated: (password: string) => void;
}

const PasswordGenerator = ({onGenerated}: PasswordGeneratorProps) => {
    const [options, setOptions] = useState<PasswordOptions>({
        length: 16,
        letters: true,
        lower: true,
        upper: false,
        randomReg: false,
        digits: true,
        symbols: true,
        customCharset: '',
    });
    const [letterCase, setLetterCase] = useState<'lower' | 'upper' | 'random'>('random');
    const [error, setError] = useState<string>('');

    const lettersDisabled = !!options.customCharset?.length;
    const poolsDisabled = !!options.customCharset?.length;
    const letterCaseDisabled = lettersDisabled || !options.letters;

    const updateLength = (v: number) => {
        setOptions(prev => ({...prev, length: Math.max(4, Math.min(128, v || 0))}));
    };

    const toggleLetters = (checked: boolean) => {
        setOptions(prev => ({
            ...prev,
            letters: checked,
            lower: checked ? letterCase === 'lower' : false,
            upper: checked ? letterCase === 'upper' : false,
            randomReg: checked ? letterCase === 'random' : false,
        }));
    };

    const onLetterCaseChange = (next: 'lower' | 'upper' | 'random') => {
        setLetterCase(next);
        setOptions(prev => ({
            ...prev,
            letters: true,
            lower: next === 'lower',
            upper: next === 'upper',
            randomReg: next === 'random',
        }));
    };

    const onGenerate = () => {
        try {
            setError('');
            const pwd = generatePassword(options);
            onGenerated(pwd);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Не удалось сгенерировать пароль';
            setError(msg);
        }
    };

    return (
        <div className={'flex flex-col gap-5 max-w-2xl'}>
            <div className={'flex items-end gap-4'}>
                <div className={'w-40'}>
                    <label htmlFor={'password-length'} className={'block text-sm text-gray-600'}>Длина пароля</label>
                    <Input
                        id={'password-length'}
                        name={'length'}
                        type={'number'}
                        placeholder={'16'}
                        value={options.length}
                        onChange={(e) => updateLength(Number(e.currentTarget.value))}
                        min={4}
                        max={128}
                    />
                </div>
                <Button type={'button'} className={'px-4 py-2'} onClick={onGenerate}>
                    Сгенерировать
                </Button>
            </div>

            {error && <div className={'text-red-600 text-sm'}>{error}</div>}

            <div className={'flex flex-col gap-3'}>
                <div className={'flex flex-wrap gap-2'}>
                    <label
                        className={`inline-flex select-none items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                            options.letters ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-indigo-700 border-indigo-600'
                        } ${poolsDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={!!options.letters}
                            onChange={(e) => toggleLetters(e.currentTarget.checked)}
                            disabled={poolsDisabled}
                        />
                        Буквы
                    </label>

                    <label
                        className={`inline-flex select-none items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                            options.digits ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-indigo-700 border-indigo-600'
                        } ${poolsDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={!!options.digits}
                            onChange={(e) => {
                                const checked = e.currentTarget.checked;
                                setOptions(prev => ({...prev, digits: checked}));
                            }}
                            disabled={poolsDisabled}
                        />
                        Цифры
                    </label>

                    <label
                        className={`inline-flex select-none items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                            options.symbols ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-indigo-700 border-indigo-600'
                        } ${poolsDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={!!options.symbols}
                            onChange={(e) => {
                                const checked = e.currentTarget.checked;
                                setOptions(prev => ({...prev, symbols: checked}));
                            }}
                            disabled={poolsDisabled}
                        />
                        Спец. символы
                    </label>
                </div>

                <div className={'flex flex-wrap gap-2'}>
                    <div className={`inline-flex overflow-hidden rounded-md border ${letterCaseDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}>
                        <label
                            className={`px-3 py-1 text-sm ${letterCaseDisabled ? '' : 'cursor-pointer'} ${letterCase === 'lower' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700'}`}>
                            <input
                                type="radio"
                                className="sr-only"
                                name="letter-case"
                                checked={letterCase === 'lower'}
                                onChange={() => onLetterCaseChange('lower')}
                                disabled={letterCaseDisabled}
                            />
                            нижний
                        </label>
                        <label
                            className={`px-3 py-1 text-sm border-l ${letterCaseDisabled ? '' : 'cursor-pointer'} ${letterCase === 'upper' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700'}`}>
                            <input
                                type="radio"
                                className="sr-only"
                                name="letter-case"
                                checked={letterCase === 'upper'}
                                onChange={() => onLetterCaseChange('upper')}
                                disabled={letterCaseDisabled}
                            />
                            верхний
                        </label>
                        <label
                            className={`px-3 py-1 text-sm border-l ${letterCaseDisabled ? '' : 'cursor-pointer'} ${letterCase === 'random' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700'}`}>
                            <input
                                type="radio"
                                className="sr-only"
                                name="letter-case"
                                checked={letterCase === 'random'}
                                onChange={() => onLetterCaseChange('random')}
                                disabled={letterCaseDisabled}
                            />
                            случайный
                        </label>
                    </div>
                </div>
            </div>

            <div className={'flex flex-col gap-2'}>
                <label className={'block text-sm text-gray-600'} htmlFor={'custom-charset'}>
                    Свой набор символов
                </label>
                <Input
                    id={'custom-charset'}
                    name={'customCharset'}
                    placeholder={'Например: abcDEF123!@#'}
                    value={options.customCharset || ''}
                    onChange={(e) => {
                        const val = e.currentTarget.value;
                        setOptions(prev => ({...prev, customCharset: val}));
                    }}
                />
            </div>
        </div>
    )
}

export {PasswordGenerator}