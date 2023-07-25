import { Component, OnInit } from '@angular/core';
import { AgentParc } from '../agent-parc';
import { AgentParcService } from '../agent-parc.service';
import { User } from '../../user/user';

@Component({
  selector: 'ngx-show-agent',
  templateUrl: './show-agent.component.html',
  styleUrls: ['./show-agent.component.scss']
})
export class ShowAgentComponent implements OnInit {
  agentParc : AgentParc;
  user: User;
  constructor(
    private agentParcService : AgentParcService
  ) { }

  async ngOnInit() {
    this.agentParc = new AgentParc();
    this.user = new User();
    let id = localStorage.getItem('id');
    this.agentParc = await this.agentParcService.getById(Number(id));
    this.user = this.agentParc.user;
  }


}
