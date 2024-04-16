import type { IWindow } from 'happy-dom';
import { beforeEach, describe, it, vi, expect } from 'vitest';
import '~/elements/my-element';

describe('Button with increment', async () => {
  beforeEach(async () => {// テストケースの各テストの前に実行されるbeforeEachフック
    document.body.innerHTML = '<my-element name="World"></my-element>';
    // domが構築されるのをまつ
    await (window as unknown as IWindow).happyDOM.whenAsyncComplete();
    // すべての非同期タスクが完了したときに解決されるPromiseを返します。
    await requestUpdate();
  });

  function getInsideButton(): HTMLElement | null | undefined {
    return document.body.querySelector('my-element')?.shadowRoot?.querySelector('button');
  }

  function requestUpdate() {
    // LitのrequestUpdate()?プロパティの変更によらずに要素を更新してレンダリングしたい場合
    return document.body.querySelector('my-element')?.requestUpdate();
  }

  // 1回クリック->ボタン内の表示に'1'が含まれる
  it('should increment the count on each click', async () => {
    getInsideButton()?.click();
    await requestUpdate();
    expect(getInsideButton()?.innerText).toContain('1');
  });
  // 表示時？->my-elementコンポーネント内に'World'が含まれる
  it('should show name props', () => {
    getInsideButton();
    expect(document.body.querySelector('my-element')?.shadowRoot?.innerHTML).toContain('World');
  });
  // click時->clickイベントが発火する
  it('should dispatch count event on button click', () => {
    // 関数をモックする(vitestの機能)
    const spyClick = vi.fn();

    document.querySelector('my-element')?.addEventListener('count', spyClick);
    // ボタンクリック
    getInsideButton()?.click();
    // その関数が呼び出されることをテスト
    expect(spyClick).toHaveBeenCalled();
  });
});
