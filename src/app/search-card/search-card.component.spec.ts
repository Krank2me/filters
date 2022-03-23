import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCardComponent } from './search-card.component';
import { TypeFilter, TypeSearch } from './search-card.model';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';
import { fieldData } from './classMock/search-card.mock'

const fieldMockup: TypeSearch[] = fieldData;
describe('SearchCardComponent', () => {
  let component: SearchCardComponent;
  let fixture: ComponentFixture<SearchCardComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCardComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatIconModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCardComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.fields = fieldMockup;
    component.fieldsSelected = component.fields[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test onChangeState method', () => {
    const spy = spyOn(component, 'setQuery');
    component.onChangeState();
    expect(spy).toHaveBeenCalled();
  });

  it('should call sentEvent method', () => {
    const spy = spyOn(component, 'sentEvent');
    component.fieldsSelected = component.fields[0];
    component.setQuery();
    expect(component.controlQuery.valid).toBeTrue();
    expect(component.fieldsSelected).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('test call onInput method', async (done) => {
    fixture.whenStable().then(() => {
      const spy = spyOn(component, 'onInput');
      const input = fixture.debugElement.query(By.css('input'));
      let element = input.nativeElement as HTMLElement;
      const event = new Event('input');
      expect(element).toBeTruthy();
      element.dispatchEvent(event);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(event.target);
      done();
    });
  });

  it('test onInput method only number', async (done) => {
    fixture.whenStable().then(() => {
      const spy = spyOn(component, 'onInput');
      component.fieldsSelected = component.fields[2];
      const input = fixture.debugElement.query(By.css('input'));
      let element = input.nativeElement as HTMLInputElement;
      const event = new Event('input');
      element.value = '12345';
      expect(element).toBeTruthy();
      element.dispatchEvent(event);
      expect(component.fieldsSelected).toBeTruthy();
      expect(component.fieldsSelected.type).toEqual(TypeFilter.NUMERIC);
      expect(!/^[0-9]$/.test(element.value));
      expect(component.controlQuery.value).toEqual(element.value);
      done();
    });
  });

  it('test matSelect event', async (done) => {
    const spy = spyOn(component, 'onChange');
    const matSelectFirst = await loader.getHarness(MatSelectHarness);
    expect(matSelectFirst).toBeTruthy();
    await matSelectFirst.open();
    const optionList = await matSelectFirst.getOptions();
    const unitOption = optionList[3];
    await unitOption.click();
    const textValue = await matSelectFirst.getValueText();
    expect(optionList.length).toEqual(6);
    expect(textValue.toLowerCase()).toBe('unit');
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('test clean method on click action', async (done) => {
    fixture.whenStable().then(async () => {
      const spy = spyOn(component, 'clean');
      component.fieldsSelected = component.fields[2];
      const input = fixture.debugElement.query(By.css('input'));
      let element = input.nativeElement as HTMLInputElement;
      const event = new Event('input');
      element.value = '12345';
      expect(element).toBeTruthy();
      element.dispatchEvent(event);
      expect(component.showClose).toBeTruthy();
      const matIcon = await loader.getHarness(MatIconHarness);
      expect(matIcon).toBeTruthy();
      const matIconName = await matIcon.getName();
      expect(matIconName).toBe('close');
      (await matIcon.host()).click();
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
