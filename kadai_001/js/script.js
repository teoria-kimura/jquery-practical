$(function () {

  //メインビジュアルカルーセル設定
  $('.carousel').slick({
    fade: true, //フェードインでの画像切替設定
    speed: 1500,
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 3000,
    arrows: false,
  });

  //リンクのホバー不透明度変化
  $('a').hover(function () {
    $(this).animate({ opacity: 0.5 }, 500);
  },
    function () {
      $(this).animate({ opacity: 1 }, 500);
    });

  //トップへ戻るボタンの表示
  $(window).scroll(function () {
    const scrollValue = $(this).scrollTop(); // 現在のスクロール位置を取得
    if (scrollValue >= 100) {
      $('#back-btn').fadeIn(); //フェードインメソッドで実装
      //$('#back-btn').css('display', 'inline');　これだとフェードしない
    } else {
      //$('#back-btn').css('display', 'none');　これだとフェードしない
      $('#back-btn').fadeOut(); //フェードアウトメソッドで実装
    }
  });

  //内部リンククリックからのスクロールを滑らかにする設定
  $('a[href^="#"]').click(function () { //ID属性の#から始まるリンクを指定（内部リンクに絞って指定する）
    const adjust = 0; //スクロールしたときの高さ調整（メニューバーなどがあってずれるときなどに使う）
    const href = $(this).attr('href'); //このリンクのhrefを抜き取る
    const target = $(href == "#" || href == "" ? 'html' : href); //リンクが「#」だけか「」の場合、html（ページトップのこと）が選択される。つまり、それ以外のリンクは指定されたid（#〜〜）が選択される。
    const position = target.offset().top + adjust; //上で指定したtarget（上端）にadjustで調整した位置を格納するためのもの
    $('body,html').animate({ scrollTop: position }, 400, 'swing'); //ブラウザ対応のために、body、htmlの両方を対象に。amimateメソッドでスクロールを滑らかに。
    return false; //既存の設定を解除
  });

  //スクロールしたらフェードイン
  $(window).scroll(function () {  //Scrollされるたびに以下の関数呼び出す
    $('section').each(function () { //各sectionに対して繰り返し処理をするeachメソッドを使う
      const sectionTop = $(this).offset().top; //sectionの上端がページ全体の上からどの位置にあるかを取得
      const scrollValue = $(window).scrollTop(); //現在のスクロール位置を取得
      const windowHeight = $(window).height(); //ブラウザの表示領域の高さを取得

      if (scrollValue + windowHeight > sectionTop) { //もしもスクロール位置とウインドの高さの合計がsectionの上端を超えたらtrue
        $(this).addClass('fade-in'); //このsection要素をフェードインで表示させる
      }
    });
  });

  //モーダルウィンドウの設定
  $('.item img').click(function () { //itemクラスの画像がクリックされたら
    const imgSrc = $(this).attr('src'); //まずはクリックされた画像のsrcを取得
    $('.modal-img').attr('src', imgSrc); //モーダルの画像srcを設定
    $('#modal').fadeIn(); //モーダルウインドウをフェードイン表示
  });

  $('.close-button, #modal').click(function() { //✕ボタンで閉じるついでにモーダルをクリックでも閉じる設定に
    $('#modal').fadeOut(); //フェードアウト処理
  });

});