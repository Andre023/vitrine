<?php

namespace App\Filament\Pages;

use App\Models\SiteSettings;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class ManageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon  = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Configurações do Site';
    protected static ?string $title           = 'Configurações do Site';
    protected static ?int    $navigationSort  = 99;
    protected static string  $view            = 'filament.pages.manage-settings';

    public ?array $data = [];

    protected array $imageFields = ['logo', 'hero_imagem', 'sobre_imagem'];

    public function mount(): void
    {
        $this->form->fill(SiteSettings::get()->toArray());
    }

    /**
     * Cria um FileUpload que sabe carregar arquivos já existentes no storage/public.
     *
     * getUploadedFileUsing: chamado quando o Filament precisa exibir um arquivo
     * já salvo. Retorna um TemporaryUploadedFile apontando para o arquivo real,
     * permitindo preview e o botão de remover/trocar funcionarem corretamente.
     *
     * saveUploadedFileUsing: chamado ao salvar um novo upload. Persiste o arquivo
     * em storage/app/public/settings e retorna o caminho relativo (string) para o banco.
     */
    protected function imageUpload(string $field, string $label, bool $fullSpan = false): FileUpload
    {
        $component = FileUpload::make($field)
            ->label($label)
            ->image()
            ->disk('public')
            ->directory('settings')
            ->visibility('public')
            ->imageEditor()
            ->nullable()
            ->getUploadedFileUsing(function (FileUpload $component, string|null $file): ?TemporaryUploadedFile {
                if (!$file || !Storage::disk('public')->exists($file)) {
                    return null;
                }

                $path     = Storage::disk('public')->path($file);
                $mime     = mime_content_type($path) ?: 'image/jpeg';
                $filename = basename($file);

                return TemporaryUploadedFile::createFromLivewire([
                    'name'       => $filename,
                    'tmpFilename' => $filename,
                    'size'       => Storage::disk('public')->size($file),
                    'type'       => $mime,
                    'path'       => $path,
                    'url'        => Storage::disk('public')->url($file),
                ]);
            })
            ->saveUploadedFileUsing(function (FileUpload $component, TemporaryUploadedFile $file): string {
                $filename = $file->store('settings', 'public');
                return $filename;
            })
            ->dehydrateStateUsing(function ($state): ?string {
                if (is_array($state)) {
                    return array_values($state)[0] ?? null;
                }
                return $state ?: null;
            });

        if ($fullSpan) {
            $component->columnSpanFull();
        }

        return $component;
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([

                Section::make('🎨 Identidade Visual')
                    ->description('Nome, logo e cores da sua vitrine.')
                    ->schema([
                        TextInput::make('nome_site')
                            ->label('Nome do Site')
                            ->required()
                            ->maxLength(100),

                        Select::make('fonte')
                            ->label('Fonte')
                            ->options([
                                'Inter'            => 'Inter (moderna)',
                                'Poppins'          => 'Poppins (arredondada)',
                                'Playfair Display' => 'Playfair Display (elegante)',
                                'Nunito'           => 'Nunito (amigável)',
                                'Montserrat'       => 'Montserrat (clean)',
                            ])
                            ->default('Inter'),

                        ColorPicker::make('cor_primaria')
                            ->label('Cor Principal'),

                        ColorPicker::make('cor_secundaria')
                            ->label('Cor Secundária'),

                        $this->imageUpload('logo', 'Logo (opcional)', fullSpan: true)
                            ->helperText('Se não tiver logo, o nome do site será exibido no lugar.'),

                    ])->columns(2),

                Section::make('🦸 Seção Hero (Topo da Página)')
                    ->description('A primeira coisa que o visitante vê.')
                    ->schema([
                        TextInput::make('hero_badge_texto')
                            ->label('Texto do Badge')
                            ->placeholder('Ex: ✦ Ebooks Digitais')
                            ->maxLength(60),

                        TextInput::make('hero_titulo')
                            ->label('Título Principal')
                            ->required()
                            ->maxLength(150)
                            ->columnSpanFull(),

                        Textarea::make('hero_subtitulo')
                            ->label('Subtítulo')
                            ->rows(2)
                            ->columnSpanFull(),

                        TextInput::make('hero_cta_texto')
                            ->label('Texto do Botão CTA')
                            ->placeholder('Ex: Ver todos os ebooks'),

                        TextInput::make('hero_cta_link')
                            ->label('Link do Botão CTA')
                            ->placeholder('Ex: #ebooks ou https://...'),

                        $this->imageUpload('hero_imagem', 'Imagem de Fundo do Hero', fullSpan: true),

                    ])->columns(2),

                Section::make('📊 Números / Estatísticas')
                    ->description('Exibidos abaixo do hero. Deixe em branco para ocultar.')
                    ->schema([
                        TextInput::make('stat_1_numero')->label('Número 1')->placeholder('Ex: 50+'),
                        TextInput::make('stat_1_label')->label('Legenda 1')->placeholder('Ex: Ebooks publicados'),
                        TextInput::make('stat_2_numero')->label('Número 2')->placeholder('Ex: 10.000'),
                        TextInput::make('stat_2_label')->label('Legenda 2')->placeholder('Ex: Leitores satisfeitos'),
                        TextInput::make('stat_3_numero')->label('Número 3')->placeholder('Ex: 5★'),
                        TextInput::make('stat_3_label')->label('Legenda 3')->placeholder('Ex: Avaliação média'),
                    ])->columns(2),

                Section::make('📚 Seção de Ebooks')
                    ->schema([
                        TextInput::make('secao_ebooks_titulo')
                            ->label('Título da Seção')
                            ->placeholder('Ex: Nossos Ebooks'),
                        TextInput::make('secao_ebooks_subtitulo')
                            ->label('Subtítulo da Seção')
                            ->placeholder('Ex: Escolha o seu e comece hoje mesmo'),
                    ])->columns(2),

                Section::make('👤 Seção Sobre')
                    ->description('Apresente você ou sua marca abaixo dos ebooks.')
                    ->schema([
                        TextInput::make('sobre_titulo')
                            ->label('Título da Seção Sobre')
                            ->placeholder('Ex: Quem sou eu?')
                            ->columnSpanFull(),

                        Textarea::make('sobre_texto')
                            ->label('Texto')
                            ->rows(5)
                            ->columnSpanFull(),

                        $this->imageUpload('sobre_imagem', 'Foto / Imagem', fullSpan: true),

                    ]),

                Section::make('🔗 Redes Sociais e Contato')
                    ->schema([
                        TextInput::make('instagram')
                            ->label('Instagram')
                            ->placeholder('https://instagram.com/seu_perfil')
                            ->url(),

                        TextInput::make('facebook')
                            ->label('Facebook')
                            ->placeholder('https://facebook.com/sua_pagina')
                            ->url(),

                        TextInput::make('youtube')
                            ->label('YouTube')
                            ->placeholder('https://youtube.com/@seu_canal')
                            ->url(),

                        TextInput::make('whatsapp')
                            ->label('WhatsApp')
                            ->placeholder('https://wa.me/5511999999999')
                            ->url(),

                        TextInput::make('email_contato')
                            ->label('E-mail de Contato')
                            ->email()
                            ->placeholder('contato@exemplo.com')
                            ->columnSpanFull(),
                    ])->columns(2),

                Section::make('📝 Rodapé')
                    ->schema([
                        TextInput::make('rodape_texto')
                            ->label('Texto do Rodapé')
                            ->maxLength(200)
                            ->columnSpanFull(),
                    ]),

            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $state = $this->form->getState();

        foreach ($this->imageFields as $field) {
            if (isset($state[$field]) && is_array($state[$field])) {
                $state[$field] = array_values($state[$field])[0] ?? null;
            }
        }

        SiteSettings::get()->update($state);

        Notification::make()
            ->title('✅ Configurações salvas com sucesso!')
            ->success()
            ->send();
    }
}
