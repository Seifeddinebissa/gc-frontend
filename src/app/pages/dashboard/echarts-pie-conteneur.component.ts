import { ArmateurService } from './../armateur/armateur.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ConteneurService } from '../conteneur/conteneur.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-echarts-pie-conteneur',
  template:`
  <div echarts [options]="options" class="echart"></div>
`,
})
export class EchartsPieConteneurComponent implements AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;
  nbParc: number=0;
  nbHorsParc: number=0;
  conteneurs: any[];


  constructor(
    private theme: NbThemeService,
    private conteneurService: ConteneurService,
    private armateurService: ArmateurService
  ) {}


  async ngAfterViewInit() {
    let role = localStorage.getItem(environment.CONNECTEDUSERROLE);
    
    if(role == environment.ARMATEUR){
      let user = localStorage.getItem(environment.CONNECTEDUSER);
      let armateur = await this.armateurService.getArmateurByUserId(+user);
      this.conteneurs = await this.conteneurService.findByArmateurId(armateur.id);
    }else{
      this.conteneurs = await this.conteneurService.getAll();
    }
    this.conteneurs.forEach(element =>{
      if(element.status == "parqué"){
        this.nbParc++;
      }else{
        this.nbHorsParc++;
      }
    })

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [ colors.dangerLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Parc', 'Hors parc'],
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
              { value: this.nbParc, name: 'Parc' },
              { value: this.nbHorsParc, name: 'Hors parc' },
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
