/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

const Card = () => {
  return (
    <div className="min-h-[10rem] w-full p-2 border-2 bg-white">
      <div className="min-h-[10rem]">
        <h3 className="font-bold text-lg">Card Title</h3>
        <p className="break-words line-clamp-5 font-noto">
          ジョバンニもカムパネルラもいっしょに行けるのだああぼくはそのひとのために、僕のお母さんのために祈っているのでした。そしてカムパネルラもまた、そんなにして何か思い出そうとして戻ろうとしましたら、向こうの鼠いろの切符を出しました。さそりは一生けん命で甲板の格子になったみじかい芝草の中にかくれたようでした。それはだんだんはっきりして、そっちの方へ歩き出しました。そしてこれからなんでもいつでも私のとこへ行くんですジョバンニは、走ってその渚に行ってすっかりとまりました。
        </p>
      </div>
      <div className="flex items-center justify-end">
        <picture className="rounded-full border-2 block w-[40px] h-[40px]">
          <source srcSet={`/assets/profile.png`} type={`image/png`} />
          <img
            src={`/assets/profile.png`}
            alt={`profile`}
            width={40}
            height={40}
          />
        </picture>
        <h4>Cowboy Bebop</h4>
      </div>
    </div>
  );
};

export default Card;
