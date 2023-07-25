import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DemandeService } from '../demande/demande.service';

@Component({
  selector: 'ngx-echarts-pie-etat',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieEtatComponent implements AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;
  nbTraite: number=0;
  nbRecu: number=0;
  nbEncours: number=0;
  demandes:any[];


  constructor(
    private theme: NbThemeService,
    private demandeService: DemandeService
  ) {}


  async ngAfterViewInit() {
    this.demandes = await this.demandeService.getAll();
    this.demandes.forEach(element=>{
      if(element.etat == "Traité"){
        this.nbTraite++;
      }else if(element.etat == "En cours"){
        this.nbEncours++;
      }else{
        this.nbTraite++;
      }
    })
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight, colors.warningLight, colors.successLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['En cours', 'Traité', 'Reçu'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Countries',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [,
              { value: this.nbEncours, name: 'En cours' },
              { value: this.nbTraite, name: 'Traité' },
              { value: this.nbRecu, name: 'Reçu' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
  }

}
