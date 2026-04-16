<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EbookResource\Pages;
use App\Models\Ebook;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EbookResource extends Resource
{
    protected static ?string $model          = Ebook::class;
    protected static ?string $navigationIcon = 'heroicon-o-book-open';
    protected static ?string $navigationLabel = 'Ebooks';
    protected static ?string $modelLabel      = 'Ebook';
    protected static ?string $pluralModelLabel = 'Ebooks';
    protected static ?int    $navigationSort  = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([

                Forms\Components\Section::make('📖 Informações Principais')
                    ->schema([
                        Forms\Components\TextInput::make('titulo')
                            ->label('Título do Ebook')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('descricao')
                            ->label('Descrição')
                            ->rows(4)
                            ->helperText('Aparece no card do ebook na vitrine.')
                            ->columnSpanFull(),

                        Forms\Components\TextInput::make('categoria')
                            ->label('Categoria')
                            ->placeholder('Ex: Desenvolvimento Pessoal, Finanças...')
                            ->maxLength(80),

                        Forms\Components\TextInput::make('paginas')
                            ->label('Número de Páginas')
                            ->numeric()
                            ->suffix('pág.')
                            ->placeholder('Ex: 120'),
                    ])->columns(2),

                Forms\Components\Section::make('💰 Preço e Link')
                    ->schema([
                        Forms\Components\TextInput::make('link_hotmart')
                            ->label('Link de Compra (Hotmart)')
                            ->url()
                            ->required()
                            ->placeholder('https://hotmart.com/product/...')
                            ->columnSpanFull(),

                        Forms\Components\TextInput::make('preco')
                            ->label('Preço Atual')
                            ->placeholder('Ex: R$ 29,90')
                            ->maxLength(30),

                        Forms\Components\TextInput::make('preco_original')
                            ->label('Preço Original (riscado)')
                            ->placeholder('Ex: R$ 59,90')
                            ->helperText('Preencha para mostrar desconto.')
                            ->maxLength(30),

                        Forms\Components\TextInput::make('botao_texto')
                            ->label('Texto do Botão de Compra')
                            ->default('Quero este ebook')
                            ->maxLength(60)
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('🖼️ Capa e Badge')
                    ->schema([
                        Forms\Components\FileUpload::make('capa')
                            ->label('Imagem da Capa')
                            ->image()
                            ->directory('ebooks/capas')
                            ->imageEditor()
                            ->required()
                            ->columnSpanFull(),

                        Forms\Components\TextInput::make('badge_texto')
                            ->label('Texto do Badge')
                            ->placeholder('Ex: Mais Vendido, Novo, Lançamento')
                            ->maxLength(30),

                        Forms\Components\ColorPicker::make('badge_cor')
                            ->label('Cor do Badge')
                            ->default('#ef4444'),
                    ])->columns(2),

                Forms\Components\Section::make('⚙️ Configurações de Exibição')
                    ->schema([
                        Forms\Components\TextInput::make('ordem')
                            ->label('Ordem de Exibição')
                            ->numeric()
                            ->default(0)
                            ->helperText('Números menores aparecem primeiro.'),

                        Forms\Components\Toggle::make('ativo')
                            ->label('Visível na vitrine')
                            ->default(true),

                        Forms\Components\Toggle::make('destaque')
                            ->label('Exibir no Carrossel de Destaques')
                            ->helperText('Ebooks em destaque aparecem no carrossel no topo da vitrine.')
                            ->default(false),
                    ])->columns(3),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('capa')
                    ->label('Capa')
                    ->square()
                    ->size(56),

                Tables\Columns\TextColumn::make('titulo')
                    ->label('Título')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('categoria')
                    ->label('Categoria')
                    ->badge()
                    ->color('primary')
                    ->searchable(),

                Tables\Columns\TextColumn::make('preco')
                    ->label('Preço')
                    ->sortable(),

                Tables\Columns\IconColumn::make('destaque')
                    ->label('Destaque')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\IconColumn::make('ativo')
                    ->label('Ativo')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\TextColumn::make('ordem')
                    ->label('Ordem')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('ativo')->label('Ativo'),
                Tables\Filters\TernaryFilter::make('destaque')->label('Destaque'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('ordem', 'asc');
    }

    public static function getRelations(): array { return []; }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListEbooks::route('/'),
            'create' => Pages\CreateEbook::route('/create'),
            'edit'   => Pages\EditEbook::route('/{record}/edit'),
        ];
    }
}
